import {
  Checkbox,
  createStyles,
  FormControlLabel,
  makeStyles,
  Theme,
  withStyles
} from "@material-ui/core";
import { CheckboxProps } from "@material-ui/core/Checkbox";
import React, { useState } from "react";
import ChipList from "./ChipList";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    checkboxes: {
      textAlign: "center",
      color: "white"
    }
  })
);

export interface SkillsProps {
  programmingLangues: string[];
  lineNumbers: { [key: string]: number };
  frameworks: string[];
  interests: string[];
  tools: string[];
  foreground: { colorName: string; intensity: number };
  selectedLanguageUpdate: (selectedLanguage: string) => void;
}

export default function Skills(props: SkillsProps) {
  const [state, setState] = useState({
    progLangs: true,
    frameworks: true,
    interests: true,
    tools: true
  });

  const classes = useStyles();

  const handleChange = (name: string) => (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setState({ ...state, [name]: event.target.checked });
  };

  const colorPallet = require("@material-ui/core/colors");

  const CheckboxColor = withStyles({
    root: {
      color:
        colorPallet[props.foreground.colorName][props.foreground.intensity],
      "&$checked": {
        color:
          colorPallet[props.foreground.colorName][props.foreground.intensity]
      }
    },
    checked: {}
  })((props: CheckboxProps) => <Checkbox color="default" {...props} />);

  return (
    <div>
      <div className={classes.checkboxes}>
        <FormControlLabel
          control={
            <CheckboxColor
              checked={state.progLangs}
              onChange={handleChange("progLangs")}
              value="progLangs"
            />
          }
          label="Languages"
        />

        <FormControlLabel
          control={
            <CheckboxColor
              checked={state.frameworks}
              onChange={handleChange("frameworks")}
              value="frameworks"
            />
          }
          label="Frameworks"
        />

        <FormControlLabel
          control={
            <CheckboxColor
              checked={state.interests}
              onChange={handleChange("interests")}
              value="interests"
            />
          }
          label="Interests"
        />

        <FormControlLabel
          control={
            <CheckboxColor
              checked={state.tools}
              onChange={handleChange("tools")}
              value="tools"
            />
          }
          label="Tools"
        />
      </div>

      <div>
        <ChipList
          additionalTitle={props.lineNumbers}
          onClick={props.selectedLanguageUpdate}
          chips={[
            ...(state.progLangs ? props.programmingLangues : []),
            ...(state.frameworks ? props.frameworks : []),
            ...(state.interests ? props.interests : []),
            ...(state.tools ? props.tools : [])
          ]}
        />
      </div>
    </div>
  );
}
