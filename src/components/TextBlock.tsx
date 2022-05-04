import { Paper, Typography } from "@material-ui/core";
import React from "react";

export interface TextBlockProps {
  description: string;
}
export const TextBlock = ({ description }: TextBlockProps) => {
  return (
    <Paper style={{ width: "100%", backgroundColor: "rgba(255,255,255,0.8)" }}>
      <Paper style={{ padding: 20, backgroundColor: "transparent" }}>
        <Typography component="p">{description}</Typography>
      </Paper>
    </Paper>
  );
};
