import MainScreen, { MainPageProps } from '../../pages/main-page/main-page';

type AppProps = MainPageProps;

function App(props: AppProps): JSX.Element {
  return (
    <MainScreen {...props} />
  );
}

export default App;
