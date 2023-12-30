/* eslint-disable react/prop-types */
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';

function LoadingGrid({ count }) {
  return (
    <>
      {Array.from({ length: 4 }).map((value, i) => (
        <div key={i + '--post-loader'} className="card p-2 neon-shadow loader">
          <SkeletonTheme baseColor="#6c757d" highlightColor="#0dcaf0">
            <Skeleton height={30} count={count} className="mb-2" />
          </SkeletonTheme>
        </div>
      ))}
    </>
  );
}
export default LoadingGrid;
