import { TouchableOpacity, StyleSheet } from 'react-native'

const Card = ({ selected, onPress, children }) => {
  return (
    <TouchableOpacity onPress={onPress} style={[cardStyles.cardContainer, selected && { backgroundColor: '#435334' }]}>
      {children}
    </TouchableOpacity>
  );
}

const cardStyles = StyleSheet.create({
  cardContainer: {
    height: 150,
    width: 150,
    backgroundColor: "#CEDEBD",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 5,
    shadowColor: "rgba(0,0,0, .4)",
    shadowOffset: { height: 1, width: 1 },
    shadowOpacity: 1,
    shadowRadius: 1,
    elevation: 5
  }
})

export default Card;
