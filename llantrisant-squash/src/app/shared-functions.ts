import {AppConstants} from './app-constants';

export class SharedFunctions {

    /* TODO - Not syntactically corrrect
    public static clearAll() {
        $("input:checkbox").prop('checked', false);
    };
    */

    public static noSubFilter(subFilterObj) {
        for (var key in subFilterObj) {
            if (subFilterObj[key]) return false;
        }
        return true;
    }

    public static fixturesOnly(items) {
        var filtered = [];
        if(typeof items !== 'undefined'){
            for (var i = 0; i < items.length; i++) {
                var item = items[i];
                var today = new Date();
                today.setHours(0, 0, 0, 0);
                if (new Date(item.date) >= today) {
                    filtered.push(item);
                }
            }
        }
        return filtered;
    };

    public static resultsOnly(items) {
        var filtered = [];
        if(typeof items !== 'undefined'){
            for (var i = 0; i < items.length; i++) {
                var item = items[i];
                var today = new Date();
                today.setHours(0, 0, 0, 0);
                if (new Date(item.date) < today) {
                    filtered.push(item);
                }
            }
        }
        return filtered;
    };

    public static getYear(){
        
        var today = new Date();

        if(today.getMonth() === 11 && today.getDate() > 20) {
            return today.getFullYear() + 1;
        } else{
            return today.getFullYear();
        }
    }

    public static getSeason(){
        
        var today = new Date();
        var month = today.getMonth();
        var day = today.getDate();

        if (month < 7 ||
            (month === 11 && day > 20) ||
            (month === 7 && day < 11)) {
            return AppConstants.SEASON_SPRING.capitalize();
        } else{
            return AppConstants.SEASON_WINTER.capitalize();
        }
    }

    public static getSeasonForRankings(){
        
        var today = new Date();
        var month = today.getMonth();
        var day = today.getDate();

        if (month < 7 ||
            (month === 11 && day > 20) ||
            (month === 7 && day < 11)) {
            return AppConstants.SEASON_SPRING.capitalize();
        } else{
            return AppConstants.SEASON_WINTER.capitalize();
        }
    }

    public static getYearAndSeason(){
        return this.getYear() + '-' + this.getSeason();
    }

    public static getSeasonAndYearForRankings(){
        return this.getSeasonForRankings() + ' ' + this.getYear();
    }

    public static showProvisionalRankings() {
        var today = new Date();
        var month = today.getMonth();
        var day = today.getDate();
        return month > 3 && (month < 7 || (month === 7 && day < 25));
    }

    public static getMasterConfiguration(http, xmlToJson, getClubNameOnly){
        
        // Read the master configuration file
        http.get(AppConstants.MASTER_CONFIGURATION_FILE_PATH)
            .success(function(xmlData) {
                
                var configurationData = xmlToJson.convert(xmlData);
                
                if(getClubNameOnly){
                    return configurationData.CONSTANTS.CLUB;
                } else {
                    return configurationData;
                }
            })
            .error(function(data) {
                console.log('Error reading master configuration file: ' + AppConstants.MASTER_CONFIGURATION_FILE_PATH);
                return '';
            });
    }

    public static getClubConfiguration(http, xmlToJson){
        
        var year = this.getYear();
        var season = this.getSeason();
        
        var currentSeasonConfigurationFilename = './configuration/' + year + '-' + season + '.xml';
        
        http.get(currentSeasonConfigurationFilename)
            .success(function(data) {
                return xmlToJson.convert(data);
            })
            .error(function(data) {
                console.log('Error reading current season configuration from: ' + currentSeasonConfigurationFilename);
                return '';
            });	
    }

    public static getClubName(http, xmlToJson){
        
        var hostName = window.location.hostname;

        // Try and determine club from the host name
        if (hostName.indexOf("-") > 0) {
            return hostName.substr(0, hostName.indexOf("-")).capitalize();
        } else{
            return this.getMasterConfiguration(http, xmlToJson, true);
        }
    };

    public static buildTeamUrl(leagueHomePage, teamUrl, divisionId, teamId, competitionId){
        var teamUrl = leagueHomePage + teamUrl;
        var pattern = /%s/;
        teamUrl = teamUrl.replace(pattern, divisionId);
        teamUrl = teamUrl.replace(pattern, teamId);
        return teamUrl.replace(pattern, competitionId);
    }
}