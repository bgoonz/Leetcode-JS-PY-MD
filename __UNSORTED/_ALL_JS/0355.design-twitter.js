/**
 * Initialize your data structure here.
 */
class Twitter {
  constructor() {
    this.followersByUser = new Map();
    this.tweetsByUser = new Map();

    // performance.now() is not available in LeetCode, and Date.now()
    // is not accurate enough between API calls
    this.time = 0;
  }

  /**
   * Compose a new tweet.
   * @param {number} userId
   * @param {number} tweetId
   * @return {void}
   */
  postTweet(userId, tweetId) {
    let tweets;
    if (this.tweetsByUser.has(userId)) {
      tweets = this.tweetsByUser.get(userId);
    } else {
      tweets = new Map();
    }

    tweets.set(++this.time, tweetId);
    this.tweetsByUser.set(userId, tweets);
  }

  /**
   * Retrieve the 10 most recent tweet ids in the user's news feed. Each item in the news feed must be posted by users who the user followed or by the user herself. Tweets must be ordered from most recent to least recent.
   * @param {number} userId
   * @return {number[]}
   */
  getNewsFeed(userId) {
    let users = [userId];

    if (this.followersByUser.has(userId)) {
      if (this.followersByUser.get(userId).size) {
        users = users.concat(Array.from(this.followersByUser.get(userId)));
      }
    }

    let tweets = [];

    for (let user of users) {
      if (!this.tweetsByUser.has(user)) {
        continue;
      }

      const userTweets = this.tweetsByUser.get(user);
      for (let [ts, tweetId] of userTweets) {
        tweets.push({
          ts,
          tweetId,
        });
      }
    }

    tweets.sort((a, b) => {
      if (a.ts > b.ts) {
        return -1;
      } else if (a.ts < b.ts) {
        return 1;
      }

      return 0;
    });

    return tweets.map((t) => t.tweetId).slice(0, 10);
  }

  /**
   * Follower follows a followee. If the operation is invalid, it should be a no-op.
   * @param {number} followerId
   * @param {number} followeeId
   * @return {void}
   */
  follow(followerId, followeeId) {
    if (followerId === followeeId) {
      return;
    }

    if (this.followersByUser.has(followerId)) {
      this.followersByUser.get(followerId).add(followeeId);
    } else {
      this.followersByUser.set(followerId, new Set([followeeId]));
    }
  }

  /**
   * Follower unfollows a followee. If the operation is invalid, it should be a no-op.
   * @param {number} followerId
   * @param {number} followeeId
   * @return {void}
   */
  unfollow(followerId, followeeId) {
    if (this.followersByUser.has(followerId)) {
      const followers = this.followersByUser.get(followerId);
      followers.delete(followeeId);

      this.followersByUser.set(followerId, followers);
    }
  }

  /**
   * Your Twitter object will be instantiated and called as such:
   * var obj = new Twitter()
   * obj.postTweet(userId,tweetId)
   * var param_2 = obj.getNewsFeed(userId)
   * obj.follow(followerId,followeeId)
   * obj.unfollow(followerId,followeeId)
   */
}
