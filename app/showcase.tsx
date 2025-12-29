import {
    Alert,
    Avatar,
    Badge,
    Button,
    Card,
    Checkbox,
    Divider,
    Input,
    Loader,
    PasswordInput,
    Switch,
    ThemeToggle,
} from "@/components/ui";
import Feather from "@expo/vector-icons/Feather";
import React, { useState } from "react";
import { ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function ComponentShowcase() {
    const [loading, setLoading] = useState(false);
    const [checked, setChecked] = useState(false);
    const [switchEnabled, setSwitchEnabled] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleButtonPress = () => {
        setLoading(true);
        setTimeout(() => setLoading(false), 2000);
    };

    return (
        <SafeAreaView className="flex-1 bg-background">
            <ScrollView className="flex-1 px-4 py-6">
                {/* Header */}
                <View className="flex-row items-center justify-between mb-6">
                    <Text className="text-3xl font-bold text-text">
                        UI Components
                    </Text>
                    <ThemeToggle />
                </View>

                {/* Buttons Section */}
                <Section title="Buttons">
                    <View className="gap-3">
                        <Button variant="primary" onPress={handleButtonPress}>
                            Primary Button
                        </Button>
                        <Button variant="secondary">Secondary Button</Button>
                        <Button variant="outline">Outline Button</Button>
                        <Button variant="ghost">Ghost Button</Button>
                        <Button variant="danger">Danger Button</Button>
                        <Button variant="primary" loading={loading}>
                            {loading ? "Loading..." : "Click to Load"}
                        </Button>
                        <Button variant="primary" disabled>
                            Disabled Button
                        </Button>

                        <View className="flex-row gap-2">
                            <Button variant="primary" size="sm">
                                Small
                            </Button>
                            <Button variant="primary" size="md">
                                Medium
                            </Button>
                            <Button variant="primary" size="lg">
                                Large
                            </Button>
                        </View>
                    </View>
                </Section>

                <Divider className="my-6" />

                {/* Inputs Section */}
                <Section title="Inputs">
                    <View className="gap-4">
                        <Input
                            label="Email"
                            placeholder="Enter your email"
                            value={email}
                            onChangeText={setEmail}
                            required
                            leftIcon={
                                <Feather
                                    name="mail"
                                    size={20}
                                    color="#9CA3AF"
                                />
                            }
                        />

                        <Input
                            label="Username"
                            placeholder="Choose a username"
                            helperText="Must be at least 3 characters"
                        />

                        <Input
                            label="Error Example"
                            placeholder="This has an error"
                            error="This field is required"
                        />

                        <PasswordInput
                            label="Password"
                            placeholder="Enter your password"
                            value={password}
                            onChangeText={setPassword}
                            required
                        />

                        <Input
                            label="Disabled Input"
                            placeholder="Cannot edit"
                            editable={false}
                            value="Disabled value"
                        />
                    </View>
                </Section>

                <Divider className="my-6" />

                {/* Cards Section */}
                <Section title="Cards">
                    <View className="gap-3">
                        <Card variant="default">
                            <Text className="text-text font-semibold mb-2">
                                Default Card
                            </Text>
                            <Text className="text-text-secondary">
                                This is a default card with standard styling.
                            </Text>
                        </Card>

                        <Card variant="elevated">
                            <Text className="text-text font-semibold mb-2">
                                Elevated Card
                            </Text>
                            <Text className="text-text-secondary">
                                This card has a shadow for depth.
                            </Text>
                        </Card>

                        <Card variant="outlined">
                            <Text className="text-text font-semibold mb-2">
                                Outlined Card
                            </Text>
                            <Text className="text-text-secondary">
                                This card has a border instead of shadow.
                            </Text>
                        </Card>

                        <Card pressable onPress={() => alert("Card pressed!")}>
                            <Text className="text-text font-semibold mb-2">
                                Pressable Card
                            </Text>
                            <Text className="text-text-secondary">
                                Tap this card to see the interaction!
                            </Text>
                        </Card>
                    </View>
                </Section>

                <Divider className="my-6" />

                {/* Badges Section */}
                <Section title="Badges">
                    <View className="flex-row flex-wrap gap-2">
                        <Badge variant="default">Default</Badge>
                        <Badge variant="success">Success</Badge>
                        <Badge variant="error">Error</Badge>
                        <Badge variant="warning">Warning</Badge>
                        <Badge variant="info">Info</Badge>
                    </View>
                    <View className="flex-row flex-wrap gap-2 mt-3">
                        <Badge variant="success" size="sm">
                            Small
                        </Badge>
                        <Badge variant="success" size="md">
                            Medium
                        </Badge>
                        <Badge variant="success" size="lg">
                            Large
                        </Badge>
                    </View>
                </Section>

                <Divider className="my-6" />

                {/* Alerts Section */}
                <Section title="Alerts">
                    <View className="gap-3">
                        <Alert
                            variant="info"
                            title="Information"
                            message="This is an informational message."
                        />
                        <Alert
                            variant="success"
                            message="Your changes have been saved successfully!"
                        />
                        <Alert
                            variant="warning"
                            title="Warning"
                            message="Please review your information before proceeding."
                        />
                        <Alert
                            variant="error"
                            message="An error occurred. Please try again."
                        />
                    </View>
                </Section>

                <Divider className="my-6" />

                {/* Avatars Section */}
                <Section title="Avatars">
                    <View className="flex-row items-center gap-4">
                        <Avatar size="sm" initials="SM" />
                        <Avatar size="md" initials="MD" />
                        <Avatar size="lg" initials="LG" online />
                        <Avatar size="xl" initials="XL" />
                    </View>
                    <View className="flex-row items-center gap-4 mt-4">
                        <Avatar size="md" />
                        <Avatar size="md" initials="JD" online />
                        <Avatar
                            size="md"
                            source="https://i.pravatar.cc/150?img=1"
                        />
                    </View>
                </Section>

                <Divider className="my-6" />

                {/* Checkbox & Switch Section */}
                <Section title="Checkbox & Switch">
                    <View className="gap-4">
                        <Checkbox
                            label="I agree to the terms and conditions"
                            checked={checked}
                            onCheckedChange={setChecked}
                        />
                        <Checkbox
                            label="Disabled checkbox"
                            checked={false}
                            onCheckedChange={() => {}}
                            disabled
                        />

                        <Divider className="my-2" />

                        <Switch
                            label="Enable notifications"
                            checked={switchEnabled}
                            onCheckedChange={setSwitchEnabled}
                        />
                        <Switch
                            label="Disabled switch"
                            checked={false}
                            onCheckedChange={() => {}}
                            disabled
                        />
                    </View>
                </Section>

                <Divider className="my-6" />

                {/* Loader Section */}
                <Section title="Loaders">
                    <View className="gap-4">
                        <Loader message="Loading data..." />
                        <Loader size="small" />
                    </View>
                </Section>

                {/* Bottom Spacing */}
                <View className="h-8" />
            </ScrollView>
        </SafeAreaView>
    );
}

// Helper component for sections
function Section({
    title,
    children,
}: {
    title: string;
    children: React.ReactNode;
}) {
    return (
        <View>
            <Text className="text-xl font-bold text-text mb-4">{title}</Text>
            {children}
        </View>
    );
}
