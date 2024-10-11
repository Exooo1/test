export const Component = () => {
    return <div>
        <h1>This is MainComponent</h1>
        <ButtonComponent/>
    </div>
}

export const ButtonComponent = () => {
    return <>
        <h2>This is ButtonComponent</h2>
        <button onClick={() => alert('Hello')}>click</button>
    </>
}