import { Injectable } from '@angular/core';
import { Option } from '../interface/option';

@Injectable({ providedIn: 'root' })
export class OptionHelperService {

  groupOptionsByLocation(options: Option[]) {
    const map = new Map();

    options.forEach(option => {
      const municipalityId = option.municipalityId || null;
      const electoralDistrictId = option.electoralDistrictId || null;

      const key = municipalityId ? `M_${municipalityId}` : `E_${electoralDistrictId}`;

      if (!map.has(key)) {
        map.set(key, {
          municipalityId: municipalityId,
          electoralDistrictId: electoralDistrictId,
          options: [],
          candidates: option.candidates
        });
      }

      map.get(key).options.push({
        id: option.id,
        title: option.title,
        candidates: option.candidates
      });
    });

    return Array.from(map.values());
  }
}
