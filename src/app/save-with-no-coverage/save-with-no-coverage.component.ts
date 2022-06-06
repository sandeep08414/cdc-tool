import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http'

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

  hideZipCode: boolean = false;


  zipCode: string = '';

  selectedDrug: string = '';

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
  }
  showHide() {
    this.hidePanel = !this.hidePanel
  }
  drugSelection(drugName: string) {
    console.log(drugName);

    this.drugName = drugName;
    this.hideAutoComplete = true;
    this.hideZipCode = true;
  }

  searchDrugName($event: any) {
    this.hideZipCode = false;
    console.log(this.drugName)
    this.hideAutoComplete = true;
    if ($event.target.value.length > 2) {

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
            "drugName": "lip",
            "maxMatches": 70
          }
        }
      }

      this.http.post("https://www-qa2.cvs.com/Services/ICEAGPV1/drugInfo/1.0.0/findDrugByName", request).subscribe((result: any) => {

        this.searchResponse = result;
        this.searchDrugNameResponse = result.responsePayloadData.findDrugResponseList;
        console.info(this.searchDrugNameResponse);
        this.hideAutoComplete = false;

      })

    }
  }

}
