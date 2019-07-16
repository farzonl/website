import React, { useEffect } from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import CloseIcon from "@material-ui/icons/Close";
import Slide from "@material-ui/core/Slide";
import { TransitionProps } from "@material-ui/core/transitions";
import ReactMarkdown from "react-markdown";
import { Paper } from "@material-ui/core";
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    appBar: {
      position: "relative",
      background: "rgb(70,18,125)"
    },
    markdown: {
      color: "white",
      background:
        "linear-gradient(to right, rgb(162, 0, 255) , rgb(89, 0, 255))"
    },
    referenceView: {
      width: "100vw",
      height: "95vh"
    },

    title: {
      marginLeft: theme.spacing(2),
      flex: 1
    }
  })
);

const Transition = React.forwardRef<unknown, TransitionProps>(
  function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  }
);

export type ReferenceItem = {
  name: string;
  type: "repo" | "pdf";
  referenceUrl: string;
  body?: string;
};

export interface FullScreenDialogProps {
  referenceItem: ReferenceItem | undefined;
}

export default function FullScreenDialog(props: FullScreenDialogProps) {
  const classes = useStyles({});
  const [open, setOpen] = React.useState(false);

  useEffect(() => {
    if (props.referenceItem) {
      handleClickOpen();
    }
  }, [props.referenceItem]);

  function handleClickOpen() {
    setOpen(true);
  }

  function handleClose() {
    setOpen(false);
  }

  return (
    <div>
      <Dialog
        fullScreen
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        <AppBar className={classes.appBar}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleClose}
              aria-label="Close"
            >
              <CloseIcon />
            </IconButton>
            <Typography variant="h6" className={classes.title}>
              {props.referenceItem ? props.referenceItem.name : "No Name"}
            </Typography>
            <Button
              color="inherit"
              onClick={() => {
                window.location.href = props.referenceItem
                  ? props.referenceItem.referenceUrl
                  : "";
              }}
            >
              Go to {props.referenceItem ? props.referenceItem.name : "No Name"}
            </Button>
          </Toolbar>
        </AppBar>

        <div className={classes.referenceView} style={{}}>
          {props.referenceItem ? (
            props.referenceItem.type === "repo" ? (
              <div className={classes.markdown} style={{ padding: "5%" }}>
                <ReactMarkdown
                  source={
                    props.referenceItem
                      ? props.referenceItem.body
                      : "No Content"
                  }
                  escapeHtml={false}
                />
              </div>
            ) : (
              <object
                className={classes.referenceView}
                data={props.referenceItem.referenceUrl}
                type="application/pdf"
              >
                <embed
                  src={props.referenceItem.referenceUrl}
                  type="application/pdf"
                />
              </object>
            )
          ) : null}
        </div>
      </Dialog>
    </div>
  );
}
