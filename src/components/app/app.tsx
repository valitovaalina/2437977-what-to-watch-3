import MainScreen from '../../pages/main-screen/main-screen';

type AppScreenProps = {
  filmCardTitle: string;
  filmCardGenre: string;
  filmCardYear: number;
}

function App({ filmCardTitle, filmCardGenre, filmCardYear }: AppScreenProps): JSX.Element {
  return (
    <MainScreen filmCardTitle={filmCardTitle} filmCardGenre={filmCardGenre} filmCardYear={filmCardYear} />
  );
}

export default App;
