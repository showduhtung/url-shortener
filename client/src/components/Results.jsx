import {
  createStyles,
  Paper,
  Text,
  Button,
  Anchor,
  Tooltip,
} from "@mantine/core";
import { useClipboard } from "@mantine/hooks";

export const Results = ({ link, ...props }) => {
  const { copied, copy } = useClipboard();
  const { classes } = useStyles();

  return (
    <Paper
      shadow="sm"
      radius="md"
      p="xl"
      withBorder
      className={classes.root}
      {...props}
    >
      <Text>
        Shortened URL:&nbsp;&nbsp;
        <Anchor href={`//${link}`} target="_blank">
          {link}
        </Anchor>
      </Text>
      <Tooltip
        opened={copied}
        label="Copied Succesfully!"
        color="violet"
        withArrow
        openDelay={500}
      >
        <Button disabled={copied} onClick={() => copy(link)}>
          {copied ? "Copied" : "Copy"}
        </Button>
      </Tooltip>
    </Paper>
  );
};

const useStyles = createStyles(() => ({
  root: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
}));
