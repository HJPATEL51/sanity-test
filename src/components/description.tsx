import React from "react";
import { PortableText } from "@portabletext/react";

interface Props {
  description: any;
}

const Description: React.FC<Props> = ({ description }) => {
  return <PortableText value={[description[0]]} />;
};

export default Description;
