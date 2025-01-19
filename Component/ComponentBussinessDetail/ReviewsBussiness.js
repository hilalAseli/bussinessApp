import {
  View,
  Text,
  TextInput,
  Image,
  FlatList,
  ToastAndroid,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Rating } from "react-native-rating-element";
import { IconButton, List } from "react-native-paper";
import { useUser } from "@clerk/clerk-expo";
import { arrayUnion, doc, updateDoc } from "firebase/firestore";
import { db } from "../../config/FIrebaseConfig";
export default function ReviewsBussiness({ bussiness }) {
  const { user } = useUser();
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState(0);
  const [reviewsData, setReviewsData] = useState([]);

  useEffect(() => {
    setReviewsData(bussiness?.reviews || []);
  }, [bussiness]);

  const handleSubmit = async () => {
    if (!comment || rating == 0) {
      ToastAndroid.show("wajib mengisi komen dan rating", ToastAndroid.BOTTOM);
      return;
    }
    try {
      const newComment = {
        userProfile: user.imageUrl,
        userName: user.fullName,
        userRating: rating,
        userComment: comment,
        userId: user.id,
        userEmail: user.primaryEmailAddress.emailAddress,
      };
      const docRef = doc(db, "BussinessList", bussiness.id);
      await updateDoc(docRef, {
        reviews: arrayUnion(newComment),
      });
      setReviewsData((prevReviews) => [...prevReviews, newComment]);
      setComment("");
      setRating(0);
      ToastAndroid.show("comment added", ToastAndroid.BOTTOM);
    } catch (err) {
      console.log("error bro", err);
      ToastAndroid.show("error", ToastAndroid.BOTTOM);
    }
  };
  return (
    <View style={{ padding: 20, backgroundColor: "white", gap: 15 }}>
      <Text style={{ fontFamily: "Outfit_700Bold", fontSize: 20 }}>
        Reviews
      </Text>
      <View style={{ alignItems: "center" }}>
        <Rating
          rated={rating}
          onIconTap={(value) => setRating(value)}
          totalCount={5}
          ratingColor="#f1c644"
          ratingBackgroundColor="#d4d4d4"
          size={40}
          readonly={false}
          icon="star"
          direction="row"
        />
        <View
          style={{
            alignItems: "center",
            flexDirection: "row",
            marginTop: 15,
          }}
        >
          <TextInput
            placeholder="Write your comment"
            value={comment}
            onChangeText={(text) => setComment(text)}
            style={{
              flex: 1,
              padding: 10,
              borderWidth: 1,
              borderRadius: 6,
              fontFamily: "Outfit_400Regular",
              backgroundColor: "#f9f9f9",
              borderColor: "#ddd",
            }}
          />
          <IconButton
            onPress={handleSubmit}
            icon="arrow-right"
            style={{
              backgroundColor: "#ddd",
              borderRadius: 10,
            }}
          />
        </View>
      </View>
      <View>
        {reviewsData.length > 0 ? (
          reviewsData.map((item, index) => (
            <List.Item
              key={index}
              style={{
                backgroundColor: "white",
                elevation: 2,
                borderRadius: 8,
                borderWidth: 0.3,
                borderColor: "gray",
                padding: 10,
                marginVertical: 5,
              }}
              left={() => (
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    gap: 10,
                    flexWrap: "wrap",
                  }}
                >
                  <Image
                    source={{ uri: item.userProfile }}
                    style={{ width: 50, height: 50, borderRadius: 10 }}
                  />
                  <Text style={{fontFamily:'Outfit_600SemiBold'}}>{item.userName} :</Text>
                  <Text>{item.userComment}</Text>
                  <Rating
                    totalCount={5}
                    icon={"star"}
                    rated={item.userRating}
                    size={15}
                    direction={"row"}
                  />
                </View>
              )}
            />
          ))
        ) : (
          <Text>Review Kosong</Text>
        )}
      </View>
    </View>
  );
}
