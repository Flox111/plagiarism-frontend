import { SolutionType } from "@/utils/axios/integrations";
import codeStyle from "@/utils/styles/codeStyle";
import { FC } from "react";
import SyntaxHighlighter from "react-syntax-highlighter";

const CustomSyntaxHighlighter: FC<{ solution: SolutionType }> = ({
  solution,
}) => {
  return (
    <SyntaxHighlighter
      language={solution.programmingLanguage.toLowerCase()}
      style={codeStyle}
      showLineNumbers={true}
      lineNumberStyle={{
        color: "rgb(135, 135, 135)",
        marginRight: "10px",
      }}
      customStyle={{
        fontSize: "13px",
        padding: "10px",
        backgroundColor: "rgb(10, 10, 10)",
        borderColor: "rgb(46, 46, 46)",
        borderWidth: "1px",
        borderRadius: "10px",
        maxWidth: "500px",
      }}
    >
      {solution.sourceCode}
    </SyntaxHighlighter>
  );
};

export default CustomSyntaxHighlighter;
