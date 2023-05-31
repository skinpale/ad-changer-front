<template>
    <v-container class="scrollable-container pa-0 ma-0">
        <v-container>
            <v-row>
                <v-col cols="6">
                    <h1 class="ml-5">
                        This is all agencies
                    </h1>
                </v-col>
            </v-row>
            <v-divider></v-divider>
            <v-row class="ma-0">
                <v-col cols="6">
                    <v-card>
                        <v-card-title>
                            Aurora Enterpise
                            <v-spacer></v-spacer>
                            <div class="mt-1">
                                certified
                                <v-icon color="green" large class="ma-0 pa-0">mdi-check</v-icon>
                            </div>
                        </v-card-title>
                        <v-divider></v-divider>
                        <v-card-text>
                            small digitally market startup
                        </v-card-text>
                        <v-card-actions>
                            <v-btn block class="warning">Delete certification</v-btn>
                        </v-card-actions>
                    </v-card>
                </v-col>

                <v-col cols="6">
                    <v-card>
                        <v-card-title>
                            AiDS
                            <v-spacer></v-spacer>
                            <div class="mt-1">
                                no certified
                                <v-icon color="red" large class="ma-0 pa-0">mdi-alpha-x</v-icon>
                            </div>
                        </v-card-title>
                        <v-divider></v-divider>
                        <v-card-text>
                            super good ads with super good price
                        </v-card-text>
                        <v-card-actions>
                            <v-btn block class="Success">Certify</v-btn>
                        </v-card-actions>
                    </v-card>
                </v-col>

                <v-col cols="6">
                    <v-card>
                        <v-card-title>
                            Mark.qued
                            <v-spacer></v-spacer>
                            <div class="mt-1">
                                no certified
                                <v-icon color="success" large class="ma-0 pa-0">mdi-check</v-icon>
                            </div>
                        </v-card-title>
                        <v-divider></v-divider>
                        <v-card-text>
                            small digitally market startup
                        </v-card-text>
                        <v-card-actions>
                            <v-btn block class="warning">Delete certification</v-btn>
                        </v-card-actions>
                    </v-card>
                </v-col>
            </v-row>
        </v-container>
    </v-container>
</template>
<script></script>