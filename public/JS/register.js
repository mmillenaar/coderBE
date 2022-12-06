const encodeImageFileAsURL = async (element) => {
    let file = element.files[0];
    let reader = new FileReader();
    reader.onloadend = () => {
        document.getElementById('avatarInput').value = reader.result
    }
    reader.readAsDataURL(file);
}