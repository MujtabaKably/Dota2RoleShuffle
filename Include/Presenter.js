var Presenter = {
    InitTeams: function () {
        Model.InitTeamModel();
        View.renderTeams(Model.TeamList);
    }
,
    AddNewTeam: function (TeamName) {
        Model.InitSelectedTeam();
        if (TeamName != "") {
            Model.SelectedTeam.TeamName = TeamName;
            Model.SelectedTeam.TeamColor = Math.ceil(((Math.random() * ((6 - 1) + 1)) - 1));
            if (Model.SelectedTeam.Players.length < 5) {
                View.Notify("Team should have 5 players");
            }
            else {
                if (Model.SelectedTeam.TeamId != "" && Model.SelectedTeam.TeamId != undefined && Model.SelectedTeam != null) {
                    Model.TeamList[Model.SelectedTeam.TeamId] = Model.SelectedTeam;
                }
                else {
                    Model.TeamList.push(Model.SelectedTeam);
                }
                this.ReRenderAll();
            }
        }
        else {
            View.Notify("Team Name Cannot be Blank");
        }
    },
    ReRenderAll: function () {
        Model.ResetSelectedTeam();
        View.renderPlayers(Model.SelectedTeam);
        View.renderTeams(Model.TeamList);
        Storage.UpdateLocalStorage(Model.TeamList);
    },
    SelectTeam: function (TeamId) {
        Model.SelectedTeam = JSON.parse(JSON.stringify(Model.TeamList[TeamId]));
        Model.SelectedTeam.TeamId = TeamId;
        View.renderPlayers(Model.SelectedTeam);
    },
    AddPlayers: function (newPlayerName) {
        Model.InitSelectedTeam();
        if (Model.SelectedTeam.Players.length < 5) {
            if (newPlayerName != "") {
                Model.SelectedTeam.Players.push({PlayerName: newPlayerName, Position: 0});
                View.renderPlayers(Model.SelectedTeam);
            }
            else {
                View.Notify("Player Name cannot be Blank");
            }
        }
        else {
            View.Notify("A team cannot have more than 5 players");
        }
    },
    DeletePlayers: function (DelPlayers) {
        Model.InitSelectedTeam();
        var newArr = [];
        for (var y in DelPlayers) {
            newArr.push(Model.SelectedTeam.Players[DelPlayers[y]]);
        }
        Model.SelectedTeam.Players = newArr;
        this.resetPositions();
        View.renderPlayers(Model.SelectedTeam);
    },
    LogTeamList: function () {
        console.log(Model.TeamList);
    },
    clearSelected: function () {
        Model.ResetSelectedTeam();
        View.renderPlayers(Model.SelectedTeam);
    },
    shuffle: function () {
        Model.InitSelectedTeam();
        if (Model.SelectedTeam.Players.length < 5) {
            View.Notify("Please Enter 5 Players to Shuffle Roles");
        }
        else {
            var array = this.ShuffleLogic([1, 2, 3, 4, 5]);
            for (var x in array) {
                Model.SelectedTeam.Players[x].Position = array[x];
            }
            View.renderPlayers(Model.SelectedTeam);
        }
    },
    resetPositions: function () {
        for (var x in Model.SelectedTeam.Players) {
            Model.SelectedTeam.Players[x].Position = 0;
        }
    },
    ShuffleLogic: function (Array) {
        var counter = Array.length;
        while (counter > 0) {
            var index = Math.floor(Math.random() * counter);
            counter--;
            var temp = Array[counter];
            Array[counter] = Array[index];
            Array[index] = temp;
        }
        return Array;
    },
    DeleteTeam: function () {
        if (Model.SelectedTeam.TeamId != "" && Model.SelectedTeam.TeamId != undefined && Model.SelectedTeam != null) {
            Model.TeamList.splice(Model.SelectedTeam.TeamId, 1);
            this.ReRenderAll();
        }
        else {
            View.Notify("Team Not Saved.");
        }
    },
    ResetApp: function () {
        Storage.ClearLocalStorage();
        this.InitTeams();
        this.ReRenderAll();
    }
}