import { Suspense } from 'react';
import { EmbeddedTweet, TweetNotFound, TweetSkeleton } from 'react-tweet';
import { getTweet } from 'react-tweet/api';

const TweetContent = async ({ id, components, onError }) => {
  let error;
  let tweet;
  
  if (id) {
    try {
      tweet = await getTweet(id);
    } catch (err) {
      if (onError) {
        error = onError(err);
      } else {
        console.error(err);
        error = err;
      }
    }
  }

  if (!tweet) {
    const NotFound = components?.TweetNotFound || TweetNotFound;
    return <NotFound error={error} />;
  }

  return <EmbeddedTweet tweet={tweet} components={components} />;
};

export const ReactTweet = (props) => <TweetContent {...props} />;

export async function TweetComponent({ id, caption }) {
  return (
    <div className='tweet my-6'>
      <div className='flex flex-col items-center'>
        <Suspense fallback={<TweetSkeleton />}>
          <ReactTweet id={id} />
        </Suspense>
        <p className='not-prose opacity-50 italic text-xs text-center sm:px-16'>
          {caption}
        </p>
      </div>
    </div>
  );
}