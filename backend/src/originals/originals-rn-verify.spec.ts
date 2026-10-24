import { gradeRn } from './originals-rn-verify';
import { screenTestIssue } from './originals-screen-checks';

/** The React Native runner's checks, run the way the loader runs them (the frontend's built runtime in jsdom). */
describe('React Native screens', () => {
  const app = `
import { useState } from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';

export default function App() {
  const [items, setItems] = useState(0);
  return (
    <View style={styles.screen}>
      <Text style={styles.title}>Pho Real</Text>
      <Pressable onPress={() => setItems(items + 1)}><Text>Add to order</Text></Pressable>
      <Text>Items: {items}</Text>
    </View>
  );
}
const styles = StyleSheet.create({ screen: { padding: 24 }, title: { fontSize: 32, color: '#d9480f' } });
`;

  it('reads text, buttons, taps and React Native styles', async () => {
    const r = await gradeRn(app, [
      { message: 'name', screen: { text: 'Pho Real' } },
      { message: 'button', screen: { button: 'Add to order' } },
      { message: 'tap', screen: { tap: ['Add to order', 'Add to order'], text: 'Items: 2' } },
      { message: 'size', screen: { style: { of: 'Pho Real', prop: 'fontSize', min: 28 } } },
      { message: 'colour', screen: { style: { of: 'Pho Real', prop: 'color', value: 'rgb(217, 72, 15)' } } },
      { message: 'missing', screen: { text: 'Burger' } },
    ]);
    expect(r.error).toBeNull();
    expect(r.passed).toEqual([true, true, true, true, true, false]);
  });

  it('crashes on raw text outside <Text>, like a real phone', async () => {
    const r = await gradeRn(`import { View } from 'react-native';\nexport default function App() { return <View>Hello</View>; }`, [
      { message: 'hello', screen: { text: 'Hello' } },
    ]);
    expect(r.error).toMatch(/Text strings must be rendered within a <Text> component/);
    expect(r.passed).toEqual([false]);
  });

  it('reports syntax errors with the line', async () => {
    const r = await gradeRn(`import { View } from 'react-native';\nexport default function App() { return <View> }`, [{ message: 'x', screen: { text: 'x' } }]);
    expect(r.error).toMatch(/line 2/);
  });

  it('validates screen checks', () => {
    expect(screenTestIssue({ text: 'Hi' })).toBeNull();
    expect(screenTestIssue({ tap: ['Add'] })).toMatch(/something to check/);
    expect(screenTestIssue({ style: { of: 'Hi', prop: 'fontSize' } })).toMatch(/value, min or max/);
  });
});
