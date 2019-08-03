
const getUserProfil = (user: any) => {
    const pos = user.album.findIndex((i: any) => i.isProfil === 1);
    let profilPhoto = 'http://via.placeholder.com/100x100';
    if (user && user.album && user.album[pos] && user.album[pos].link) {
        profilPhoto = 'http://localhost:3000' + `/photos/${user.info.login}/${user.album[pos].link}`;
    }
    return profilPhoto;
};

export { getUserProfil };