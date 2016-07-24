var Model = {
    Position: ["", "HARD Carry", "Mid / Semi-Carry", "Off-Lane", "Support", "HARD SUPPORT"],
    Color: ["default", "success", "info", "primary", "warning", "danger"],
    TeamList: [],
    SelectedTeam: {},
    InitTeamModel: function () {
        if (Storage.GetData() == undefined || Storage.GetData() == null) {
            var TeamList = [];
            TeamList.push({
                TeamName: "Random Players",
                TeamColor: Math.ceil(((Math.random() * ((6 - 1) + 1)) - 1)),
                Players: [
                    {PlayerName: "Player 1", Position: 0},
                    {PlayerName: "Player 2", Position: 0},
                    {PlayerName: "Player 3", Position: 0},
                    {PlayerName: "Player 4", Position: 0},
                    {PlayerName: "Player 5", Position: 0}
                ]
            });
            Storage.UpdateLocalStorage(TeamList);
        }
        this.TeamList = JSON.parse(Storage.GetData());
    },
    InitSelectedTeam: function () {
        if (Object.keys(this.SelectedTeam).length == 0) {
            this.SelectedTeam.TeamName = "";
            this.SelectedTeam.Players = [];
        }
    },
    ResetSelectedTeam: function () {
        this.SelectedTeam = {};
    }
};