import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { filter, Observable, of, tap } from 'rxjs';

@Component({
  selector: 'app-save-with-no-coverage',
  templateUrl: './save-with-no-coverage.component.html',
  styleUrls: ['./save-with-no-coverage.component.css']
})
export class SaveWithNoCoverageComponent implements OnInit {

  hidePanel: boolean = false;
  hideAutoComplete: boolean = true;
  searchResponse: any = {};
  searchDrugNameResponse: any = [];
  drugName: string = '';

  showLoader: boolean = false;

  hideZipCode: boolean = true;

  showAutocomplete: boolean = false;

  noSearchItem: boolean = false;


  zipCode: string = '';

  isSelectedDrug: boolean = false;

  selectedDrug: string = '';

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
  }
  showHide() {
    this.hidePanel = !this.hidePanel
  }
  drugSelection(drugName: string) {

    this.drugName = drugName;
    this.showAutocomplete = false;
    this.searchResponse = {};
    this.searchDrugNameResponse = [];
    this.showLoader = false;
    this.hideZipCode = false;
    this.isSelectedDrug = true;
  }

  clearInput() {
    this.isSelectedDrug = false;
    this.drugName = '';
    this.hideZipCode = true;

  }


  getDrugNames($event: any) {
    this.showLoader = false;
    this.showAutocomplete = false;
    this.hideZipCode = true;
    this.noSearchItem = false;



    if ($event.target.value.length > 1) {
      this.showLoader = true;
    }
    else {
      return;
    }


    var request = {
      "requestMetaData":
      {
        "appName": "ICE_WEB",
        "channelName": "WEB",
        "deviceType": "DESKTOP",
        "deviceToken": "7777",
        "lineOfBusiness": "ICE",
        "apiKey": "c69e906f-5c23-4be8-be73-d43527cece5b",
        "source": "ICE_WEB",
        "securityType": "apiKey",
        "responseFormat": "JSON",
        "newPattern": true,
        "type": "inode"
      },
      "requestPayloadData":
      {
        "drugSearchCriteria":
        {
          "drugName": $event.target.value,
          "maxMatches": 70
        }
      }
    }

    this.http.post("https://www-qa2.cvs.com/Services/ICEAGPV1/drugInfo/1.0.0/findDrugByName", request)
      
      .subscribe((result: any) => {
       
        this.searchResponse = result;
        this.searchDrugNameResponse = result.responsePayloadData.findDrugResponseList;
       
        if (this.searchDrugNameResponse.length > 0)
        {
                  this.showAutocomplete = true;

        }
      
        else {
          this.noSearchItem = true;
          this.showAutocomplete = false;

          this.showLoader = false;


        }

        //console.log(result);

      })


  }

}
