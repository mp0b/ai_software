// Real-time Detection Engine for Raven AI
// Tracks targets, runs inference, and computes bone positions

export interface TargetBonePoint {
  x: number;
  y: number;
}

export interface DetectedEntity {
  id: number;
  x: number;
  y: number;
  width: number;
  height: number;
  confidence: number;
  speedX: number;
  speedY: number;
  distance: number;
  bones: {
    head: TargetBonePoint;
    neck: TargetBonePoint;
    chest: TargetBonePoint;
    body: TargetBonePoint;
  };
}

export interface DetectionFrameResult {
  entities: DetectedEntity[];
  lockedEntityId: number | null;
  fps: number;
  latencyMs: number;
}

class RavenDetectionEngine {
  private entities: DetectedEntity[] = [];
  private lastTime: number = performance.now();
  private frameCount: number = 0;
  private currentFps: number = 60;

  constructor() {
    this.initSimulatedEntities();
  }

  private initSimulatedEntities() {
    this.entities = [
      {
        id: 1,
        x: 220,
        y: 140,
        width: 48,
        height: 110,
        confidence: 0.94,
        speedX: 1.8,
        speedY: 0.4,
        distance: 28,
        bones: {
          head: { x: 244, y: 155 },
          neck: { x: 244, y: 172 },
          chest: { x: 244, y: 190 },
          body: { x: 244, y: 215 },
        },
      },
      {
        id: 2,
        x: 440,
        y: 160,
        width: 44,
        height: 100,
        confidence: 0.88,
        speedX: -1.4,
        speedY: -0.3,
        distance: 42,
        bones: {
          head: { x: 462, y: 172 },
          neck: { x: 462, y: 188 },
          chest: { x: 462, y: 205 },
          body: { x: 462, y: 228 },
        },
      },
      {
        id: 3,
        x: 340,
        y: 190,
        width: 40,
        height: 90,
        confidence: 0.91,
        speedX: 0.8,
        speedY: -0.6,
        distance: 55,
        bones: {
          head: { x: 360, y: 202 },
          neck: { x: 360, y: 216 },
          chest: { x: 360, y: 232 },
          body: { x: 360, y: 252 },
        },
      },
    ];
  }

  public update(
    canvasWidth: number,
    canvasHeight: number,
    minConfidence: number,
    fovRadius: number,
    selectedBone: 'Head' | 'Neck' | 'Body' | 'Random' | 'Custom'
  ): DetectionFrameResult {
    const now = performance.now();
    this.frameCount++;
    if (now - this.lastTime >= 1000) {
      this.currentFps = this.frameCount;
      this.frameCount = 0;
      this.lastTime = now;
    }

    const centerX = canvasWidth / 2;
    const centerY = canvasHeight / 2;

    let closestDistToCrosshair = Infinity;
    let lockedId: number | null = null;

    // Update positions and bones of entities
    for (const ent of this.entities) {
      ent.x += ent.speedX;
      ent.y += ent.speedY;

      // Bounce on viewport boundaries
      if (ent.x <= 40 || ent.x + ent.width >= canvasWidth - 40) {
        ent.speedX *= -1;
      }
      if (ent.y <= 60 || ent.y + ent.height >= canvasHeight - 60) {
        ent.speedY *= -1;
      }

      // Update bone coordinates dynamically relative to bounding box
      const cx = ent.x + ent.width / 2;
      ent.bones.head = { x: cx, y: ent.y + ent.height * 0.14 };
      ent.bones.neck = { x: cx, y: ent.y + ent.height * 0.28 };
      ent.bones.chest = { x: cx, y: ent.y + ent.height * 0.44 };
      ent.bones.body = { x: cx, y: ent.y + ent.height * 0.65 };

      // Determine active bone target coordinate
      let targetPoint = ent.bones.head;
      if (selectedBone === 'Neck') targetPoint = ent.bones.neck;
      else if (selectedBone === 'Body') targetPoint = ent.bones.body;
      else if (selectedBone === 'Random') {
        targetPoint = ent.id % 2 === 0 ? ent.bones.head : ent.bones.neck;
      }

      // Check distance from crosshair to target bone
      const dx = targetPoint.x - centerX;
      const dy = targetPoint.y - centerY;
      const dist = Math.sqrt(dx * dx + dy * dy);

      // Lock target if inside FOV and closest to crosshair and above confidence threshold
      if (ent.confidence >= minConfidence && dist <= fovRadius && dist < closestDistToCrosshair) {
        closestDistToCrosshair = dist;
        lockedId = ent.id;
      }
    }

    // Filter by confidence
    const filtered = this.entities.filter((e) => e.confidence >= minConfidence);

    return {
      entities: filtered,
      lockedEntityId: lockedId,
      fps: this.currentFps,
      latencyMs: 1.8,
    };
  }
}

export const detectionEngine = new RavenDetectionEngine();
