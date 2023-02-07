<template>
	<nav>
		<v-toolbar elevation="1" dark color="#181818">
			<v-toolbar-title>
				<v-btn text prepend-icon="mdi-vuetify" class="text-capitalize font-weight-bold text-h5 mx-5"
					size="large" href="/">
					<span class="gradient-underline">Advertisement Exchanger</span>
				</v-btn>
			</v-toolbar-title>

			<v-spacer></v-spacer>
			<div>
				<router-link style="text-decoration: none;" to="/profile">
					<v-btn small text>
						<v-icon class="pr-1" small>mdi-account</v-icon>profile
					</v-btn>
				</router-link>

				<router-link style="text-decoration: none;" to="/orders">
					<v-btn small text href="/orders">
						<v-icon class="pr-1" small>mdi-list-box</v-icon>orders
					</v-btn>
				</router-link>

				<router-link style="text-decoration: none;" to="/pays">
					<v-btn small text href="/">
						<v-icon class="pr-1" small>
							mdi-currency-usd
						</v-icon>pays</v-btn>

				</router-link>
			</div>
			
			<span class="mx-3">|</span>

			<router-link style="text-decoration: none;" to="/signup">
				<v-btn small text>
					<v-icon class="pr-1" small>
						mdi-logout
					</v-icon>logout</v-btn>
			</router-link>
		</v-toolbar>
	</nav>
</template>

<script>
export default {}
</script>

<style>
/* .v-btn{
	transform: scaleY(1);
	transform-origin: bottom;
}

.v-btn:hover{
	transform: scale(1.2);
	transform-origin: bottom;
} */

.gradient-underline {
	position: relative;
	/* transform: scaleY(1);
	transform-origin: center;
	transition: transform 0.3s ease; */
}

/* .gradient-underline:hover {
	transform: scaleX(1.1);
	transform-origin: center;
} */

.gradient-underline::before {
	content: "";
	position: absolute;
	bottom: -3px;
	left: 0;
	right: 0;
	height: 3px;
	background: linear-gradient(to right, #e24bdd, #6235f6);
	transform: scaleX(1);
	transform-origin: top left;
	transition: transform 0.3s ease;
}

.gradient-underline:hover::before {
	transform: scaleX(0);
	transform-origin: top left;
}
</style>