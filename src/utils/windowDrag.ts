// Reliable Tauri v2 Window Dragging Handler for Windows Desktop

export async function startWindowDrag(e: React.MouseEvent) {
  // Only trigger on primary left mouse button
  if (e.buttons !== 1) return;

  // Don't drag if clicking buttons, inputs, selects, or interactive elements
  const target = e.target as HTMLElement | null;
  if (
    target?.closest('button') ||
    target?.closest('input') ||
    target?.closest('select') ||
    target?.closest('textarea') ||
    target?.closest('[role="switch"]') ||
    target?.closest('.no-drag')
  ) {
    return;
  }

  try {
    const { getCurrentWindow } = await import('@tauri-apps/api/window');
    const appWindow = getCurrentWindow();
    await appWindow.startDragging();
  } catch {
    // Web browser fallback: no-op
  }
}
