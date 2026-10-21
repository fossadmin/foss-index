{
  description = "FOSS directory site (static Astro catalog)";

  inputs = {
    nixpkgs.url = "github:NixOS/nixpkgs/nixos-unstable";
    flake-utils.url = "github:numtide/flake-utils";
  };

  outputs = { self, nixpkgs, flake-utils }:
    flake-utils.lib.eachDefaultSystem (system:
      let
        pkgs = nixpkgs.legacyPackages.${system};
      in
      {
        packages.default = pkgs.buildNpmPackage {
          pname = "foss-directory";
          version = "0.1.0";
          src = ./.;

          # First `nix build` fails and prints the real hash; paste it here.
          npmDepsHash = pkgs.lib.fakeHash;

          npmBuildScript = "build";

          installPhase = ''
            mkdir -p $out
            cp -r dist/* $out/
          '';
        };

        devShells.default = pkgs.mkShell {
          packages = with pkgs; [ nodejs_22 ];
        };
      }
    );
}
