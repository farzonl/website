import React, { useState } from "react";
import Checkbox, { CheckboxProps } from "@material-ui/core/Checkbox";
import ChipList from "./ChipList";
import {
  Theme,
  createStyles,
  makeStyles,
  withStyles,
  FormControlLabel
} from "@material-ui/core";
import { purple } from "@material-ui/core/colors";

const PurpleCheckbox = withStyles({
  root: {
    color: purple[100],
    "&$checked": {
      color: purple[100]
    }
  },
  checked: {}
})((props: CheckboxProps) => <Checkbox color="default" {...props} />);

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    checkboxes: {
      textAlign: "center",
      color : "white"
    }
  })
);

export interface SkillsProps {
  programmingLangues: string[];
  lineNumbers : {[key : string] : number};
  frameworks: string[];
  interests: string[];
  tools: string[];
  selectedLanguageUpdate : (selectedLanguage : string) => void
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

  return (
    <div>
      <div className={classes.checkboxes}>
        <FormControlLabel
          control={
            <PurpleCheckbox
              checked={state.progLangs}
              onChange={handleChange("progLangs")}
              value="progLangs"
            />
          }
          label="Languages"
        />

        <FormControlLabel
          control={
            <PurpleCheckbox
              checked={state.frameworks}
              onChange={handleChange("frameworks")}
              value="frameworks"
            />
          }
          label="Frameworks"
        />

        <FormControlLabel
          control={
            <PurpleCheckbox
              checked={state.interests}
              onChange={handleChange("interests")}
              value="interests"
            />
          }
          label="Interests"
        />

        <FormControlLabel
          control={
            <PurpleCheckbox
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
            ...((state.progLangs) ? props.programmingLangues : []),
            ...((state.frameworks) ? props.frameworks : []),
            ...((state.interests) ? props.interests : []),
            ...((state.tools) ? props.tools : []),
          ]}
        />
      </div>
    </div>
  );
}
