import { Container, MantineProvider, createStyles } from "@mantine/core";
import { URLShortener } from "./features/URLShortener";

function App() {
  const { classes } = useStyles();
  return (
    <MantineProvider defaultProps={{ Container: { sizes } }}>
      <div className={classes.root}>
        <Container className={classes.center}>
          <div className={classes.content}>
            <URLShortener />
          </div>
        </Container>
      </div>
    </MantineProvider>
  );
}

const useStyles = createStyles(() => ({
  root: { backgroundColor: "lightblue" },
  center: { height: "99vh" },
  content: { paddingTop: "15%" },
}));

const sizes = {
  xs: 540,
  sm: 720,
  md: 960,
  lg: 1140,
  xl: 1320,
};

export default App;
