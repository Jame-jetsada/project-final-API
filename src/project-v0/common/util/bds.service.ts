import { HttpService } from "@nestjs/axios";
import { Injectable,  } from "@nestjs/common";
import { KEY } from "src/config/config";

@Injectable()
export class BdsService {
  private tokens: any;
  private tokenExpirydate: any;
  constructor(
    private http: HttpService,
  ) {}

  getInventoryOnhandBalance(itemList: [], siteList: []) {
    const url = KEY.BDS_KEY.url + '/InventoryOnhandBalance';
    const key = KEY.BDS_KEY.key;
    const headersRequest = {
      'Content-Type': 'application/json',
      ApiKey: key,
    };
    let itemCode = '',
      siteId = '';
    itemList.forEach(itm => {
      itemCode += itm + ',';
    });

    siteList.forEach(itm => {
      siteId += itm + ',';
    });

    const body = {
      item_code: itemCode.substring(0, itemCode.length - 1),
      site_id: siteId.substring(0, siteId.length - 1),
    };
    return new Promise((resolve, reject) => {
      this.http.post(url, body, { headers: headersRequest }).subscribe(
        res => {
          resolve(res.data);
        },
        err => {
          reject(err);
        },
      );
    });
  }
}

