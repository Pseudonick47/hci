	<template>
		<div>
			<v-tooltip bottom>
				<span>Help</span>
			</v-tooltip>
			<v-dialog
				v-model="show"
				max-width="800px"
			>
				<v-jumbotron color="blue accent-1">
					<v-container fill-height>
						<v-layout
							align-left
							column
						>
							<v-btn
								fab
								right
								absolute
								flat
								color="white"
								@click="closeHelp"
							>
								<v-icon>
									close
								</v-icon>
							</v-btn>
							<h3 class="display-3">
								Help
							</h3>
							<span class="subheading">Lorem ipsum dolor sit amet, pri veniam forensibus id. Vis maluisset molestiae id, ad semper lobortis cum. At impetus detraxit incorrupte usu, repudiare assueverit ex eum, ne nam essent vocent admodum.</span>
							<br><br>
							<v-btn
								large
								color="primary"
								@click="basicInformation"
							>
								<v-icon left>
									info
								</v-icon>
								Basic information
							</v-btn>
							<v-btn
								large
								color="primary"
								@click="typesView"
							>
								<v-icon left>
									dashboard
								</v-icon>
								Types of view
							</v-btn>
						</v-layout>
					</v-container>
				</v-jumbotron>
			</v-dialog>
			<v-dialog
				v-model="basicCard"
				max-width="900px"
				persistent
			>
				<v-jumbotron color="blue accent-1">
					<v-container fill-height>
						<v-layout column>
							<v-layout row>
								<v-btn
									fab
									flat
									color="white"
									@click="backOnHelpWindow"
								>
									<v-icon>
										arrow_back
									</v-icon>
								</v-btn>
								<h3	class="display-1">Basic information</h3>
								<v-btn
									fab
									flat
									color="white"
									@click="closeHelp"
									right
									absolute
								>
									<v-icon>
										close
									</v-icon>
								</v-btn>
							</v-layout>
								<div v-if="imageStep == 1" >
									<img
										src="./../assets/app-part4.png"
										style="float:left;margin:10px"
									>
									<p>
										Lorem ipsum dolor sit amet, pri veniam forensibus id. Vis maluisset molestiae id, ad semper lobortis cum. At impetus detraxit incorrupte usu, repudiare assueverit ex eum, ne nam essent vocent admodum.
									</p>
								</div>
								<div v-else-if="imageStep == 2">
									<img
										src="./../assets/app-part1.png"
										style="float:left;margin:10px"
										height="260px"
									>
									<p>
										Lorem ipsum dolor sit amet, pri veniam forensibus id. Vis maluisset molestiae id, ad semper lobortis cum. At impetus detraxit incorrupte usu, repudiare assueverit ex eum, ne nam essent vocent admodum.
									</p>
								</div>
								<div v-else>
									<img
										src="./../assets/app-part2.png"
										style="float:left;margin:10px"
										height="260px"
									>
									<p>
										Lorem ipsum dolor sit amet, pri veniam forensibus id. Vis maluisset molestiae id, ad semper lobortis cum. At impetus detraxit incorrupte usu, repudiare assueverit ex eum, ne nam essent vocent admodum.
									</p>
								</div>
							<v-footer>
								<v-btn
									color="primary"
									left
									absolute
									@click="previousImage"
								>previous tip</v-btn>
								<v-btn
									color="primary"
									right
									absolute
									@click="nextImage"
								>next tip</v-btn>
							</v-footer>
						</v-layout>
					</v-container>
				</v-jumbotron>
			</v-dialog>
			<v-dialog
				v-model="typesViewCard"
				max-width="900px"
				persistent
			>
				<v-jumbotron color="blue accent-1">
					<v-container fill-height>
						<v-layout column>
							<v-layout row>
								<v-btn
									fab
									flat
									color="white"
									@click="backOnHelpWindow"
								>
									<v-icon>
										arrow_back
									</v-icon>
								</v-btn>
								<h3 class="display-1">Types of view</h3>
								<v-btn
									fab
									flat
									right
									absolute
									color="white"
									@click="closeHelp"
								>
									<v-icon>
										close
									</v-icon>
								</v-btn>
							</v-layout>
							<div v-if="viewStep == 1">
								<img
									src="./../assets/graph.png"
									height="260px"
									style="float:left;margin:10px"
								>
								<p>
									Lorem ipsum dolor sit amet, pri veniam forensibus id. Vis maluisset molestiae id, ad semper lobortis cum. At impetus detraxit incorrupte usu, repudiare assueverit ex eum, ne nam essent vocent admodum.
								</p>
							</div>
							<div v-else-if="viewStep == 2">
								<img
									src="./../assets/table.png"
									height="260px"
									style="float:left;margin:10px"
								>
								<p>
									Lorem ipsum dolor sit amet, pri veniam forensibus id. Vis maluisset molestiae id, ad semper lobortis cum. At impetus detraxit incorrupte usu, repudiare assueverit ex eum, ne nam essent vocent admodum.
								</p>
							</div>
							<div v-else-if="viewStep == 3">
								<img
									src="./../assets/pie-chart.png"
									height="260px"
									style="float:left;margin:10px"
								>
								<p>
									Lorem ipsum dolor sit amet, pri veniam forensibus id. Vis maluisset molestiae id, ad semper lobortis cum. At impetus detraxit incorrupte usu, repudiare assueverit ex eum, ne nam essent vocent admodum.
								</p>
							</div>
							<div v-else-if="viewStep == 4">
								<img
									src="./../assets/bar-chart.jpg"
									height="260px"
									style="float:left;margin:10px"
								>
								<p>
									Lorem ipsum dolor sit amet, pri veniam forensibus id. Vis maluisset molestiae id, ad semper lobortis cum. At impetus detraxit incorrupte usu, repudiare assueverit ex eum, ne nam essent vocent admodum.
								</p>
							</div>
							<div v-else-if="viewStep == 5">
								<img
									src="./../assets/column-chart.png"
									height="260px"
									style="float:left;margin:10px"
								>
								<p>
									Lorem ipsum dolor sit amet, pri veniam forensibus id. Vis maluisset molestiae id, ad semper lobortis cum. At impetus detraxit incorrupte usu, repudiare assueverit ex eum, ne nam essent vocent admodum.
								</p>
							</div>
							<div v-else>
								<img
									src="./../assets/scatter-chart.jpg"
									height="260px"
									style="float:left;margin:10px"
								>
								<p>
									Lorem ipsum dolor sit amet, pri veniam forensibus id. Vis maluisset molestiae id, ad semper lobortis cum. At impetus detraxit incorrupte usu, repudiare assueverit ex eum, ne nam essent vocent admodum.
								</p>
							</div>
							<v-footer>
								<v-btn
									color="primary"
									left
									absolute
									@click="previousView"
								>previous tip</v-btn>
								<v-btn
									color="primary"
									right
									absolute
									@click="nextView"
								>next tip</v-btn>
							</v-footer>
						</v-layout>
					</v-container>
				</v-jumbotron>
			</v-dialog>

		</div>
	</template>

	<script>
	export default {
		data() {
			return {
				show: false,
				page: 1,
				basicCard: false,
				typesViewCard: false,
				imageStep: 1,
				viewStep: 1
			};
		},
		methods: {
			basicInformation() {
				this.show = false;
				this.basicCard = true;
			},
			typesView() {
				this.show = false;
				this.typesViewCard = true;
			},
			backOnHelpWindow() {
				this.basicCard = false;
				this.typesViewCard = false;
				this.show = true;
				this.imageStep = 1;
				this.viewStep = 1;
			},
			closeHelp() {
				this.basicCard = false;
				this.typesViewCard = false;
				this.show = false;
				this.imageStep = 1;
				this.viewStep = 1;
			},
			nextImage() {
				if (this.imageStep === 3) {
					this.imageStep = 1;
				} else {
					this.imageStep++;
				}
			},
			previousImage() {
				if (this.imageStep === 1) {
					this.imageStep = 3;
				} else {
					this.imageStep--;
				}
			},
			nextView() {
				if (this.viewStep === 6) {
					this.viewStep = 1;
				} else {
					this.viewStep++;
				}
			},
			previousView() {
				if (this.viewStep === 1) {
					this.viewStep = 6;
				} else {
					this.viewStep--;
				}
			}
		}
	};
	</script>
