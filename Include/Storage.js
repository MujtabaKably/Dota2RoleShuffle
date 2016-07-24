var Storage = {
    GetData: function () {
        return localStorage.getItem("TeamList");
    },
    UpdateLocalStorage: function (TeamList) {
        localStorage.setItem("TeamList", JSON.stringify(TeamList));
    },
    ClearLocalStorage: function () {
        localStorage.clear();
    }
};