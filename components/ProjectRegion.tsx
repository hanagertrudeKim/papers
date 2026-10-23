import {projectRegions} from '@/lib/journey';

export default function ProjectRegion({projectId}:{projectId:string}){
 const regions=projectRegions[projectId];
 return <div className="project-region" aria-label={`Project region: ${regions.map(region=>region.name).join(', ')}`}>
  <span className="region-label" aria-hidden="true">Project region</span>
  <span className="region-countries">{regions.map(region=><span className="region-country" key={region.name}><span className="country-flag" aria-hidden="true">{region.flag}</span><span>{region.name}</span></span>)}</span>
 </div>;
}
