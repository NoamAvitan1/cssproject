"use client";
type Props = {};

export const Options = (props: Props) => {
  return (
    <div className="flex w-full flex-col">
      <section>
        <button className="">public</button>
        <button className="">private</button>
      </section>
      <section>
        <h1>title</h1>
        <input
          type="text"
          className="border-b border-b-text bg-transparent focus:outline-none"
        />
      </section>
    </div>
  );
};
