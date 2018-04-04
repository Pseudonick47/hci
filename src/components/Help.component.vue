<template>
    <div>
        <v-tooltip bottom>
            <v-btn
                medium
                fab
                color="grey"
                dark slot="activator"
                @click="helpDialog = true"
            >
                <v-icon dark>help</v-icon>
            </v-btn>
            <span>Help</span>
        </v-tooltip>
        <v-dialog
            v-model="helpDialog"
            max-width="800px"
        >
            <v-card tile>
                <v-toolbar
                    card
                    dark
                    color="black"
                >
                    <v-toolbar-title>Help</v-toolbar-title>
                    <v-spacer></v-spacer>
                    <v-btn
                        icon
                        @click.native="helpDialog = false"
                        dark
                    >
                        <v-icon color="white">close</v-icon>
                    </v-btn>
                </v-toolbar>
            </v-card>
            <v-card>
                <v-card-text>
                    Can I help you?
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Fusce facilisis, nulla tristique lobortis imperdiet, libero ipsum consequat
                     ligula, non congue nisl augue nec turpis. Mauris rhoncus tristique arcu nec
                     consequat. Nunc congue eros vitae vulputate placerat. Mauris euismod molestie
                      vehicula. Curabitur ut hendrerit purus. Duis malesuada, tortor in tempor
                       ornare, nisi erat dapibus turpis, et posuere metus purus nec mi.
                        Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere
                         cubilia Curae; Fusce id diam nec nunc rhoncus bibendum quis vitae lorem.
                          Nullam efficitur sit amet velit non ullamcorper.
                </v-card-text>
            </v-card>
        </v-dialog>
    </div>
</template>

<script>
export default {
    data() {
        return {
            helpDialog: false
        };
    }
};
</script>
