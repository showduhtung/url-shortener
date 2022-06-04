import { createStyles, Textarea, Button } from "@mantine/core";
import { useForm } from "@mantine/form";
import { isValidURL } from "../utilities";

export const Form = ({ handleSubmit, ...props }) => {
  const { classes } = useStyles();
  const { onSubmit, clearFieldError, getInputProps } = useForm({
    initialValues: { link: "" },
    validate: { link: handleValidate },
  });

  function handleValidate(value) {
    if (!value) return "Please enter a link.";
    value = stripEnterKey(value);
    if (value.length > 2000) return "Links cannot be over 2000 characters";
    // TODO doesn't allow special symbols #$%^&
    if (!isValidURL(value)) return "Not a valid url";
    return null;
  }

  return (
    <form onSubmit={onSubmit(handleSubmit)} {...props}>
      <Textarea
        placeholder="ex. https://www.google.com"
        label="Enter Link Here"
        required
        autosize
        onKeyDown={() => clearFieldError("link")}
        {...getInputProps("link")}
      />
      <div className={classes.spacing} />
      <Button onClick={onSubmit(handleSubmit)}>Shorten my link</Button>
    </form>
  );
};

const useStyles = createStyles((theme) => ({
  spacing: { marginTop: theme.spacing.md },
}));

const stripEnterKey = (link) => link.replace(/[\r\n]/gm, "");
