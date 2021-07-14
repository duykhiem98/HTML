import React, { useState } from "react";
import {
  Alert,
  Animated, Image,
  Modal,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  useWindowDimensions,
  View,
  Text
} from "react-native";
import RenderHtml from "react-native-render-html";
import { SelectableText } from "@astrocoders/react-native-selectable-text";

const ModalPoup = ({visible, children}) => {
  const [showModal, setShowModal] = useState(visible);
  const scaleValue = React.useRef(new Animated.Value(0)).current;
  React.useEffect(() => {
    toggleModal();
  }, [visible]);
  const toggleModal = () => {
    if (visible) {
      setShowModal(true);
      Animated.spring(scaleValue, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }).start();
    } else {
      setTimeout(() => setShowModal(false), 200);
      Animated.timing(scaleValue, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
  };
  return (
    <Modal transparent visible={showModal}>
      <View style={styles.modalBackGround}>
        <Animated.View
          style={[styles.modalContainer, {transform: [{scale: scaleValue}]}]}>
          {children}
        </Animated.View>
      </View>
    </Modal>
  );
};


function onPress(event, href) {
  Alert.alert(`You just pressed ${href}`);
}

const source = {
  html: `
    <h1>VR Lorem ipsum dolor sit amet, consectetur adipiscing elit. !</h1>
    <em>By <b class="author">React Native Master</b></em>
    <img src="https://image.freepik.com/free-photo/young-woman-using-vr-glasses-with-neon-lights_155003-17747.jpg" />
    <p>Vivamus bibendum feugiat pretium. <a href="https://reactnativemaster.com/">Vestibulum ultricies rutrum ornare</a>. Donec eget suscipit tortor. Nullam pellentesque nibh sagittis, pharetra quam a, varius sapien. Pellentesque ut leo id mauris hendrerit ultrices et non mauris. Quisque gravida erat at felis tincidunt tincidunt. Etiam sit amet egestas leo. Cras mollis mi sed lorem finibus, interdum molestie magna mollis. Sed venenatis lorem nec magna convallis iaculis.</p>
`
};
const renderersProps = {
  p: {
    onPress: onPress
  }
};
export const HtmlScreen = () => {
  const { width } = useWindowDimensions();
  const [visible, setVisible] = useState(false);
  const [word, setWord] = useState('');
  return (
    <View>
      <ScrollView>

        <ModalPoup visible={visible}>
          <View style={{alignItems: 'center'}}>
            <View style={styles.header}>
              <TouchableOpacity onPress={() => setVisible(false)}>
                <Image
                  source={require('./close.png')}
                  style={{height: 30, width: 30}}
                />
              </TouchableOpacity>
            </View>
          </View>
          <Text> {word}</Text>
        </ModalPoup>


        <RenderHtml
          contentWidth={width}
          source={source}
          renderersProps={renderersProps}
        />

        <SelectableText
          menuItems={["Dịch"]}
          onSelection={({ eventType, content, selectionStart, selectionEnd }) => {
            setVisible(true);
            setWord(content);
          }}
          style={styles.welcome}
          value="Hi there! This issue is being closed because it has been inactive for a while. Maybe the issue has been fixed in a recent release, or perhaps it is not affecting a lot of people. Either way, we're automatically closing issues after a period of inactivity. Please do not take it personally!

If you think this issue should definitely remain open, please let us know. The following information is helpful when it comes to determining if the issue should be re-opened:

Does the issue stions are very welcome! Read through the contribution guide, and feel free to hop into #react-native if you need help planning your contribution."
        />


      </ScrollView>
    </View>

  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5FCFF",
    padding: 10
  },
  welcome: {
    fontSize: 20,
    textAlign: "center",
    margin: 10,
    color: "#FF0000"
  },
  instructions: {
    textAlign: "center",
    color: "#333333",
    marginBottom: 5
  },
  modalBackGround: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    width: '80%',
    backgroundColor: 'white',
    paddingHorizontal: 20,
    paddingVertical: 30,
    borderRadius: 20,
    elevation: 20,
  },
  header: {
    width: '100%',
    alignItems: 'flex-end',
  },
});
