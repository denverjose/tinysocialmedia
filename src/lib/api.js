const FIREBASE_DOMAIN =
  "https://practice-1add2-default-rtdb.asia-southeast1.firebasedatabase.app";

export async function addUser(userData) {
  const response = await fetch(`${FIREBASE_DOMAIN}/users.json`, {
    method: "POST",
    body: JSON.stringify(userData),
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Could not create user.");
  }

  return null;
}

export async function authLogin(requestData) {
  const response = await fetch(`${FIREBASE_DOMAIN}/users.json`);
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Could not fetch users.");
  }

  const transformedUsers = [];

  for (const key in data) {
    const userObj = {
      id: key,
      ...data[key],
    };

    transformedUsers.push(userObj);
  }
  if (transformedUsers.length === 0) {
    alert("Wrong Email or Password!");
    return;
  }

  const user = transformedUsers.find(
    (user) =>
      user.email === requestData.email && user.password === requestData.password
  );
  if (user) {
    const expirationTime = new Date(new Date().getTime() + 3600000 * 2);
    requestData.method(user.id, expirationTime.toISOString());
  }
  if (!user) {
    alert("WRONG CREDENTIALS!");
  }
  return transformedUsers;
}

export async function getProfile(profileId) {
  const response = await fetch(`${FIREBASE_DOMAIN}/users/${profileId}.json`);
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Could not fetch profile.");
  }

  const loadedProfile = {
    id: profileId,
    ...data,
  };

  return loadedProfile;
}

export async function editProfile(requestData) {
  const response = await fetch(
    `${FIREBASE_DOMAIN}/users/${requestData.profileId}.json`,
    {
      method: "PATCH",
      body: JSON.stringify(requestData.data),
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Could not create quote.");
  }

  return null;
}

export async function addPost(requestData) {
  const response = await fetch(
    `${FIREBASE_DOMAIN}/posts/${requestData.profileId}.json`,
    {
      method: "POST",
      body: JSON.stringify(requestData.postData),
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Could not add post.");
  }

  return { postId: data.name };
}

export async function getProfilePost(profileId) {
  const response = await fetch(`${FIREBASE_DOMAIN}/posts/${profileId}.json`);
  const data = await response.json();

  const profileResponse = await fetch(
    `${FIREBASE_DOMAIN}/users/${profileId}.json`
  );
  const profileData = await profileResponse.json();

  if (!response.ok) {
    throw new Error(data.message || "Could not get posts.");
  }

  if (!profileResponse.ok) {
    throw new Error(data.message || "Could not fetch profile.");
  }

  const loadedProfile = {
    id: profileId,
    ...profileData,
  };
  const transformedPosts = [];

  for (const key in data) {
    const postObj = {
      id: key,
      fullName: `${loadedProfile.firstName} ${loadedProfile.lastName}`,
      profilePicture: loadedProfile.profilePicture,
      ...data[key],
    };

    transformedPosts.push(postObj);
  }

  return transformedPosts;
}

//ALL POSTS IN FEED
export async function getAllPosts() {
  const postResponse = await fetch(`${FIREBASE_DOMAIN}/posts.json`);
  const data = await postResponse.json();

  if (!postResponse.ok) {
    throw new Error(data.message || "Could not fetch posts.");
  }

  const transformedPosts = [];

  for (const key in data) {
    let secondResponse = await fetch(`${FIREBASE_DOMAIN}/posts/${key}.json`);
    const profileResponse = await fetch(`${FIREBASE_DOMAIN}/users/${key}.json`);
    const postData = await secondResponse.json();
    const profileData = await profileResponse.json();

    if (!profileResponse.ok) {
      throw new Error(data.message || "Could not fetch profile.");
    }

    if (!secondResponse.ok) {
      throw new Error(data.message || "Could not get post of user.");
    }

    for (const x in postData) {
      const postObj = {
        id: x,
        fullName: `${profileData.firstName} ${profileData.lastName}`,
        profilePicture: profileData.profilePicture,
        ...postData[x],
      };
      transformedPosts.push(postObj);
    }
  }

  return transformedPosts;
}

export async function getPostComment(postId) {
  const response = await fetch(`${FIREBASE_DOMAIN}/comments/${postId}.json`);
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Could not get comments.");
  }

  const transformedComments = [];

  for (const key in data) {
    const profileResponse = await fetch(
      `${FIREBASE_DOMAIN}/users/${data[key].userId}.json`
    );
    const profileData = await profileResponse.json();

    if (!profileResponse.ok) {
      throw new Error(data.message || "Could not fetch profile.");
    }

    const commentObj = {
      id: key,
      fullName: `${profileData.firstName} ${profileData.lastName}`,
      profilePicture: profileData.profilePicture,
      ...data[key],
    };

    transformedComments.push(commentObj);
  }

  return transformedComments;
}

export async function addComment(requestData) {
  const response = await fetch(
    `${FIREBASE_DOMAIN}/comments/${requestData.postId}.json`,
    {
      method: "POST",
      body: JSON.stringify(requestData.commentData),
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Could not add comment.");
  }

  return { commentId: data.name };
}

export async function getPostLike(postId) {
  const response = await fetch(`${FIREBASE_DOMAIN}/likes/${postId}.json`);
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Could not get likes.");
  }

  const transformedLikes = [];

  for (const key in data) {
    const profileResponse = await fetch(
      `${FIREBASE_DOMAIN}/users/${data[key].userId}.json`
    );
    const profileData = await profileResponse.json();

    if (!profileResponse.ok) {
      throw new Error(data.message || "Could not fetch profile.");
    }

    const commentObj = {
      id: key,
      fullName: `${profileData.firstName} ${profileData.lastName}`,
      profilePicture: profileData.profilePicture,
      ...data[key],
    };

    transformedLikes.push(commentObj);
  }

  return transformedLikes;
}

export async function like(requestData) {
  const response = await fetch(
    `${FIREBASE_DOMAIN}/likes/${requestData.postId}.json`,
    {
      method: "POST",
      body: JSON.stringify(requestData.likeData),
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Could not add likes.");
  }

  return { likeId: data.name };
}

export async function unlike(requestData) {
  const response = await fetch(
    `${FIREBASE_DOMAIN}/likes/${requestData.postId}/${requestData.likeId}.json`,
    {
      method: "DELETE",
    }
  );
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Could not unlike.");
  }

  return null;
}

export async function getSinglePost(requestData) {
  const postResponse = await fetch(
    `${FIREBASE_DOMAIN}/posts/${requestData.userId}/${requestData.postId}.json`
  );
  const data = await postResponse.json();
  const profileResponse = await fetch(
    `${FIREBASE_DOMAIN}/users/${requestData.userId  }.json`
  );
  const profileData = await profileResponse.json();

  if (!profileResponse.ok) {
    throw new Error(data.message || "Could not fetch profile.");
  }

  if (!postResponse.ok) {
    throw new Error(data.message || "Could not fetch posts.");
  }
  const loadedPost = {
    id: requestData.postId,
    fullName: `${profileData.firstName} ${profileData.lastName}`,
    profilePicture: profileData.profilePicture,

    ...data,
  };

  return loadedPost;
}
