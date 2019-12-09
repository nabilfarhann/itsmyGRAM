const functions = require('firebase-functions');

exports.addToFollowing = functions.database.ref('/follow/')
    .onCreate(event => {
        const initiatorUid = event.params.initiatorUid;
        const interestedInFollowingUid = event.params.interestedInFollowingUid;
        const rootRef = event.data.ref.root;
        let FollowingMeRef = rootRef.child('usersFollowingMe/' + interestedInFollowingUid + "/" + initiatorUid);
        return FollowingMeRef.set(true);
    });

