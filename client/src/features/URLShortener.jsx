import { createStyles, Paper, Text } from "@mantine/core";
import { useState } from "react";
import { postLink } from "../apis";
import { Form, CardTitle as Title, Results } from "../components";
import { stripEnterKey } from "../utilities";

export const URLShortener = () => {
  const { classes } = useStyles();
  const [shortenedLink, setShortenedLink] = useState("");

  async function saveLink({ link }) {
    link = stripEnterKey(link);
    const { data } = await postLink({ url: link });
    setShortenedLink(`localhost:3000/${data.code}`);
  }

  return (
    <>
      <Paper shadow="sm" radius="md" p="xl" withBorder>
        <Title />
        <div className={classes.spacing} />
        <Form handleSubmit={saveLink} />
        <div className={classes.spacing} />
        <Text>
          *Note: "Enter" characters in the input area will not be included.
        </Text>
      </Paper>
      <div className={classes.spacing} />
      {shortenedLink && <Results link={shortenedLink} />}
    </>
  );
};

const useStyles = createStyles((theme) => ({
  spacing: { marginTop: theme.spacing.md },
}));
