"use client";

import { Monaco } from "../codeEditor/Monaco";

type Props = {
  htmlExamples: Array<string>;
  setHtmlExamples: (newExamples: Array<string>) => void;
  selected: number;
  setSelected: (index: number) => void;
};

export const HTMLExamplesEditor = (props: Props) => {
  
  const handleChange = (value: string) => {
    console.log(value);
    const newExamples = props.htmlExamples.map((e, i) => {
      if (i == props.selected) {
        return value
      } else {
        return e
      }
    });
    props.setHtmlExamples(newExamples);
  };

  return (
    <>
      <Monaco
        h="100%"
        w="100%"
        code={props.htmlExamples[props.selected]}
        handleChange={handleChange}
        limit={100}
        lang="html"
        lineNumbers={true}
      />
    </>
  );
};
