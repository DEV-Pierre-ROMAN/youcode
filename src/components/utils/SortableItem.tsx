import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import React from "react";

export type SortableItemProps = {
  children: React.ReactNode;
  sortableValue: string | number;
  index: number;
};

export const SortableItem = ({
  children,
  sortableValue,
  index,
}: SortableItemProps) => {
  const {
    setNodeRef,
    attributes,
    listeners,
    transform,
    transition,
    activeIndex,
  } = useSortable({
    id: sortableValue,
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: index === activeIndex ? 999 : undefined,
    cursor: "default",
  };

  const childrenWithProps = React.Children.map(children, (child) => {
    // Checking isValidElement is the safe way and avoids a
    // typescript error too.
    if (React.isValidElement(child)) {
      return React.cloneElement(child, {
        ...child.props,
        draggableListeners: listeners,
      });
    }
    return child;
  });

  return (
    <div ref={setNodeRef} style={style} {...attributes}>
      {childrenWithProps}
    </div>
  );
};
