

using System.ComponentModel;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using Needle.Engine.Utils;
using UnityEditor;
using UnityEngine;

namespace Needle.Engine
{
	internal static class GitActions
	{
		public static bool IsCloneable(string url)
		{
			return url.Contains("github") || url.Contains("gitlab") ||
			       url.EndsWith(".git");
		}

		public static string GetRepositoryName(string url)
		{
			return Path.GetFileNameWithoutExtension(url);
		}
		
		public static Task<bool> CloneProject(ExportInfo exportInfo)
		{
			var url = exportInfo.DirectoryName;
			var startDirectory = SessionState.GetString("NeedleEngineCloneRepository",
				Path.GetFullPath(Application.dataPath + "/../"));
			var targetDirectory = EditorUtility.OpenFolderPanel("Select Project Directory", startDirectory, "");
			if (!string.IsNullOrEmpty(targetDirectory))
			{
				var expectedDirectory = targetDirectory + "/" + GetRepositoryName(url);
				Debug.Log("Setup project at " + expectedDirectory);
				SessionState.SetString("NeedleEngineCloneRepository", targetDirectory);
				SceneView.lastActiveSceneView?.ShowNotification(new GUIContent("Cloning remote project..."));
				return Tools.CloneRepository(url, targetDirectory).ContinueWith(res =>
				{
					if (res.Result)
					{
						if(Directory.Exists(expectedDirectory)) targetDirectory = expectedDirectory;
						if (TryFindNeedleProjectDirectory(targetDirectory, out var needleDir))
						{
							targetDirectory = needleDir;
						}
						SceneView.lastActiveSceneView?.ShowNotification(new GUIContent("Successfully cloned project..."));
						Debug.Log($"{"<b>Successfully</b>".AsSuccess()} pulled {url.AsLink()} into {targetDirectory.AsLink()}", exportInfo);
						Undo.RecordObject(exportInfo, "Change git url to local path");
						exportInfo.DirectoryName = PathUtils.MakeProjectRelative(targetDirectory);
						return true;
					}
					return false;
				}, TaskScheduler.FromCurrentSynchronizationContext());
			}
			
			return Task.FromResult(false);
		}

		/// <summary>
		/// Searches for a needle.config.json in the provided directory
		/// </summary>
		private static bool TryFindNeedleProjectDirectory(string dir, out string needleProjectDir)
		{
			var dirs = Directory.GetFiles(dir, "needle.config.json", SearchOption.AllDirectories);
			needleProjectDir = dirs.FirstOrDefault();
			if (!string.IsNullOrWhiteSpace(needleProjectDir))
			{
				needleProjectDir = Path.GetDirectoryName(needleProjectDir);
				return true;
			}
			return false;
		}
	}
}