import axios from "axios";

export const CreatePDFServer = () => {

    const download = async () => {
        try {
            const data = await axios.get('http://localhost:5555/upload/download') as any
            const blob = new Blob([data])
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = 'hello';
            document.body.appendChild(a);
            a.click();
            a.remove();
        } catch (error) {
            console.error('Error downloading file:', error);
        }
    }

    return <div>
        <h1>CreatePDFServer</h1>
        <button onClick={download}>DownloadFile</button>
    </div>
}