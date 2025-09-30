type Board = {
    id: string;
    name: string;
};

type Props = {
    board: Board;
};

export default function Show({ board }: Props) {
    return (
        <>
            <h1>Board id: {board.id}</h1>
            <h2>Board name: {board.name}</h2>
        </>
    );
}
