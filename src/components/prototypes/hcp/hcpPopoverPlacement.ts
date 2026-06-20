const DEFAULT_MARGIN = 16;
const DEFAULT_GAP = 4;

export type HcpAnchoredPlacement = {
  anchorPosition: { top: number; left: number };
  transformOrigin: {
    vertical: "top" | "bottom" | "center";
    horizontal: "left" | "right" | "center";
  };
  maxHeight: number;
  width: number;
};

type PlacementBounds = {
  top: number;
  left: number;
  right: number;
  bottom: number;
  width: number;
  height: number;
};

type PlacementOptions = {
  width?: number;
  estimatedHeight?: number;
  margin?: number;
  gap?: number;
  /** Minimum height before flipping above the anchor */
  flipThreshold?: number;
};

function getPlacementBounds(anchorEl: HTMLElement): PlacementBounds {
  const frame = anchorEl.closest("[data-hcp-prototype-frame]");
  if (frame instanceof HTMLElement) {
    return frame.getBoundingClientRect();
  }

  return {
    top: DEFAULT_MARGIN,
    left: DEFAULT_MARGIN,
    right: window.innerWidth - DEFAULT_MARGIN,
    bottom: window.innerHeight - DEFAULT_MARGIN,
    width: window.innerWidth - DEFAULT_MARGIN * 2,
    height: window.innerHeight - DEFAULT_MARGIN * 2,
  };
}

/** Dropdown-style — opens flush below or above the anchor. */
export function getHcpAnchoredPlacement(
  anchorEl: HTMLElement,
  options: PlacementOptions = {},
): HcpAnchoredPlacement {
  const {
    width = 320,
    estimatedHeight = 420,
    margin = DEFAULT_MARGIN,
    gap = DEFAULT_GAP,
    flipThreshold = 240,
  } = options;

  const bounds = getPlacementBounds(anchorEl);
  const anchor = anchorEl.getBoundingClientRect();
  const popoverWidth = Math.min(width, bounds.width - margin * 2);

  const spaceBelow = bounds.bottom - margin - (anchor.bottom + gap);
  const spaceAbove = anchor.top - gap - (bounds.top + margin);
  const openAbove = spaceBelow < flipThreshold && spaceAbove > spaceBelow;
  const availableHeight = Math.max(
    180,
    Math.min(estimatedHeight, openAbove ? spaceAbove : spaceBelow),
  );

  let anchorLeft = anchor.right;
  let transformHorizontal: HcpAnchoredPlacement["transformOrigin"]["horizontal"] = "right";

  const popoverLeft = anchorLeft - popoverWidth;

  if (popoverLeft < bounds.left + margin) {
    anchorLeft = anchor.left;
    transformHorizontal = "left";
  } else if (anchorLeft > bounds.right - margin) {
    anchorLeft = bounds.right - margin;
    transformHorizontal = "right";
  }

  const anchorPosition = openAbove
    ? { top: anchor.top - gap, left: anchorLeft }
    : { top: anchor.bottom + gap, left: anchorLeft };

  return {
    anchorPosition,
    transformOrigin: {
      vertical: openAbove ? "bottom" : "top",
      horizontal: transformHorizontal,
    },
    maxHeight: availableHeight,
    width: popoverWidth,
  };
}

/** Context panel — floats beside the row, vertically centered on the anchor. */
export function getHcpContextPanelPlacement(
  anchorEl: HTMLElement,
  options: PlacementOptions = {},
): HcpAnchoredPlacement {
  const {
    width = 340,
    estimatedHeight = 420,
    margin = DEFAULT_MARGIN,
    gap = 12,
  } = options;

  const bounds = getPlacementBounds(anchorEl);
  const anchor = anchorEl.getBoundingClientRect();
  const maxHeight = Math.max(200, Math.min(estimatedHeight, bounds.height - margin * 2));

  const anchorCenterY = anchor.top + anchor.height / 2;
  const spaceLeft = anchor.left - gap - (bounds.left + margin);
  const spaceRight = bounds.right - margin - (anchor.right + gap);
  const openLeft = spaceLeft >= Math.min(width, 280) || spaceLeft >= spaceRight;

  const popoverWidth = Math.min(
    width,
    openLeft ? spaceLeft : spaceRight,
    bounds.width - margin * 2,
  );

  let anchorLeft = openLeft ? anchor.left - gap : anchor.right + gap;
  let transformHorizontal: HcpAnchoredPlacement["transformOrigin"]["horizontal"] = openLeft
    ? "right"
    : "left";

  if (openLeft) {
    if (anchorLeft - popoverWidth < bounds.left + margin) {
      anchorLeft = bounds.left + margin + popoverWidth;
    }
  } else if (anchorLeft + popoverWidth > bounds.right - margin) {
    anchorLeft = bounds.right - margin - popoverWidth;
  }

  const halfHeight = maxHeight / 2;
  let anchorTop = anchorCenterY;

  if (anchorTop - halfHeight < bounds.top + margin) {
    anchorTop = bounds.top + margin + halfHeight;
  } else if (anchorTop + halfHeight > bounds.bottom - margin) {
    anchorTop = bounds.bottom - margin - halfHeight;
  }

  return {
    anchorPosition: { top: anchorTop, left: anchorLeft },
    transformOrigin: {
      vertical: "center",
      horizontal: transformHorizontal,
    },
    maxHeight,
    width: popoverWidth,
  };
}

export function getHcpPopoverContainer(anchorEl: HTMLElement | null): HTMLElement | undefined {
  if (!anchorEl) {
    return undefined;
  }

  const frame = anchorEl.closest("[data-hcp-prototype-frame]");
  return frame instanceof HTMLElement ? frame : undefined;
}
