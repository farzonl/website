import AppBar from "@material-ui/core/AppBar";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import IconButton from "@material-ui/core/IconButton";
import Slide from "@material-ui/core/Slide";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import Toolbar from "@material-ui/core/Toolbar";
import { TransitionProps } from "@material-ui/core/transitions";
import Typography from "@material-ui/core/Typography";
import CloseIcon from "@material-ui/icons/Close";
import { forwardRef, useState, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import { ThemeProvider } from "../requests/Github";
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    appBar: {
      position: "relative"
    },
    markdown: {
      color: "white"
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

const Transition = forwardRef<unknown, TransitionProps>(
  function Transition(props, ref) {
    //@ts-ignore
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
  const [open, setOpen] = useState(false);

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
        <AppBar
          style={{
            backgroundColor: ThemeProvider.headerColor
          }}
          className={classes.appBar}
        >
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
                const url = props.referenceItem
                  ? props.referenceItem.referenceUrl
                  : "";
                let win = window.open(url, "Redirecting");
                if (win) win.focus();
              }}
            >
              {props.referenceItem && props.referenceItem.type === "pdf"
                ? "Download PDF"
                : "Go to Github"}
            </Button>
          </Toolbar>
        </AppBar>

        <div className={classes.referenceView} style={{ overflowX: "hidden" }}>
          {props.referenceItem ? (
            props.referenceItem.type === "repo" ? (
              <div
                className={classes.markdown}
                style={{
                  padding: "5%",
                  background: ThemeProvider.theme
                }}
              >
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
