import { ReactNode } from "react";

//We're creating a generic List Component - allows the handling fo any type of object
interface ListProps<T> {
  items: T[];
  render: (item: T) => ReactNode;
}

const List = <T,>({ items, render }: ListProps<T>) => {
  return (
    <>
      {items.map((item, index) => (
        //render = callback
        //index = unique id, preferable way of rendering
        <span key={index}>{render(item)}</span>
      ))}
    </>
  );
};

export default List;
