var Template = {
    TeamTemplate: '<button type="button" class="btn btn-{{TeamColor}} btn-xs Players Auto" value="{{TeamId}}" onclick="View.getTeamId(this);">{{TeamName}}</button>',
    PlayerTemplate: '<li class="list-group-item list-group-item-{{Color}}" onclick="View.togglePlayerSelect(this)"><h6><b>{{PlayerName}}</b><span class="FontSize16 pull-right label label-{{Color}}">{{PosNo}} {{Position}}</span></h6></li>'
};