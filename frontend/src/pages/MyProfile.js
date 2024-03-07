import '../css/MyProfile.css';

export default function MyProfile() {
    return (
        <>
            <h1> My Profile </h1>
            <label htmlFor="file-upload" className="custom-file-upload">
                <i className="bi bi-upload"></i>
            </label>
            <input id="file-upload" type="file" style={{display: 'none'}} />
        </>
    );
}
