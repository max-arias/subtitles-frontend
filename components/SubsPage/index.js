import { minutesToHours } from '../../utils/dates';
import Image from 'next/image';

import IndeterminateLoader from '../../components/Loader/Indeterminate';
import SubsTable from '../SubsTable';

const SubsPage = ({ mediaData, subtitles, loading }) => {
  return (
    <div className="w-full h-screen font-sans">
      {loading ? (
        <div className="w-full flex justify-center">
          <IndeterminateLoader />
        </div>
      ) : (
        <div className="grid gap-4 grid-cols-12 p-10">
          <div className="pb-0 col-start-1 col-end-13 lg:col-start-2 lg:col-end-4 bg-white-100 rounded flex-col">
            <Image
              width="185"
              height="280"
              className="rounded"
              src={`http://image.tmdb.org/t/p/w185/${mediaData.data.poster_path}`}
              alt={mediaData.title}
            />
            <div>
              <h1 className="font-bold text-4xl mb-2">{mediaData.title}</h1>
              <p>{mediaData.data.genres.map(g => g.name).join(' | ')}</p>
              <p>{minutesToHours(mediaData.data.runtime)}</p>
              <p className="mt-2 pr-6">{mediaData.data.overview}</p>
            </div>
          </div>
          <div className="col-start-1 col-end-13 lg:col-start-4 lg:col-end-13">
            <div>
              {/* <IndeterminateLoader type="circle" text="OS" />
                <IndeterminateLoader type="circle" text="YTS" /> */}
              <SubsTable data={subtitles} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SubsPage;
