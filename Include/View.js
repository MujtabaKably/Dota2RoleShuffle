var View ={
    renderTeams: function (TeamList) {
        var teamHtml = '';
        for (var x in TeamList) {
            teamHtml += Template.TeamTemplate.replace('{{TeamName}}', TeamList[x].TeamName).replace('{{TeamId}}', x).replace('{{TeamColor}}', Model.Color[TeamList[x].TeamColor]);
        }
        document.getElementById("Teams").innerHTML = teamHtml;
    },
    renderPlayers: function (SelectedTeam) {
        var playerhtml = '';
        this.resetFields();
        if (SelectedTeam.Players != undefined && SelectedTeam.TeamName != undefined) {
            document.getElementById("txtTeamName").value = SelectedTeam.TeamName;
            document.getElementById("hidTeamId").value = SelectedTeam.TeamId;
            for (var x in SelectedTeam.Players) {
                playerhtml += Template.PlayerTemplate.replace('{{PlayerName}}', SelectedTeam.Players[x].PlayerName);
                playerhtml = playerhtml.replace('{{Color}}', Model.Color[SelectedTeam.Players[x].Position]);
                playerhtml = playerhtml.replace('{{Color}}', Model.Color[SelectedTeam.Players[x].Position]);
                playerhtml = playerhtml.replace('{{Position}}', SelectedTeam.Players[x].Position == 0 ? "" : '(' + Model.Position[SelectedTeam.Players[x].Position] + ')');
                playerhtml = playerhtml.replace('{{PosNo}}', SelectedTeam.Players[x].Position == 0 ? "" : "Position " + SelectedTeam.Players[x].Position);
            }
        }
        document.getElementById("ULPlayers").innerHTML = playerhtml;
        document.getElementById("txtPlayerName").focus();
    },
    getTeamId: function (btn) {
        Presenter.SelectTeam(btn.value);
    },
    clearTeam: function () {
        Presenter.clearSelected();
    },
    getPlayerData: function () {
        Presenter.AddPlayers(document.getElementById("txtPlayerName").value);
    },
    resetFields: function () {
        document.getElementById("txtTeamName").value = "";
        document.getElementById("txtPlayerName").value = "";
        document.getElementById("hidTeamId").value = "";
    },
    getTeamName: function () {
        Presenter.AddNewTeam(document.getElementById("txtTeamName").value);
    },
    Notify: function (Message) {
        document.getElementById("spnNotify").innerText = Message;
        document.getElementById("btnAlert").click();
        setTimeout(function () {
            document.getElementById("btn_CloseDlg").focus();
        }, 500);
    },
    deletePlayers: function () {
        var DelArray = [];
        var SelVals = document.getElementsByClassName("list-group-item");
        if (SelVals.length > 0) {
            for (var x = 0; x < SelVals.length; x++) {
                if (SelVals[x].className.indexOf("active") == -1) {
                    DelArray.push(x);
                }
            }
        }
        Presenter.DeletePlayers(DelArray.length == 5 ? [] : DelArray);
    },
    togglePlayerSelect: function (List) {
        List.className = ' ' + List.className + ' ';
        if (List.className.indexOf(' active ') == -1) {
            List.className += ' active ';
        }
        else {
            List.className = List.className.replace('active', '');
        }
        List.className = List.className.trim();
    },
    shuffleRoles: function () {
        Presenter.shuffle();
    },
    deleteTeam: function () {
        Presenter.DeleteTeam();
    },
    onEnter: function (evt) {
        if (evt.keyCode == 13) {
            this.getPlayerData();
        }
    },
    resetApplication: function () {
        Presenter.ResetApp();
    }
};